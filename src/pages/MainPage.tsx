import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, fetchPostInPage } from "../redux/postSlicer";
import { taskPostSelector, taskUserSelector } from "../redux/selector";
import { AppDispatch } from "../redux/store";
import { fetchUser } from "../redux/userSlicer";
import { Input, Pagination, Spin } from "antd";
import { PaginationProps } from "antd/lib";

function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const postSelector = useSelector(taskPostSelector);
  const userSelector = useSelector(taskUserSelector);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const onChange: PaginationProps["onChange"] = (page) => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    dispatch(fetchPost(search));
    dispatch(fetchPostInPage({ page, search }));
  }, [search]);

  useEffect(() => {
    dispatch(fetchPostInPage({ page, search }));
  }, [page]);

  return (
    <div className="flex h-[100%]overflow-y-auto justify-start flex-col">
      <div className="flex flex-col items-center p-3 h-[100%]">
        <div className="flex flex-row">
          <Pagination
            showSizeChanger={false}
            current={page}
            onChange={onChange}
            total={postSelector.data.postLength}
          />

          <Input
            className="mx-6 w-auto"
            placeholder="Search"
            size="large"
            allowClear={true}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        {postSelector.isLoading || userSelector.isLoading ? (
          <div className="h-[100%] flex justify-center items-center">
            <Spin size="large" />
          </div>
        ) : (
          postSelector.data.post.map((post) => {
            return (
              <PostCard
                key={post.id}
                post={post}
                user={
                  userSelector.data.users.find(
                    (user) => user.id == post.userId
                  )!
                }
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default MainPage;
