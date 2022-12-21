import Head from "next/head";
import React from "react";
import { useAxios, CustomAxiosResponse } from "../../hooks/useAxios";
import { TagListType } from "../api/tags";
import { Chip, Pagination, TextInput, Loader, Flex } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

type TagListResponse = CustomAxiosResponse<TagListType>;

export default function TagList() {
  const itemsPerPage = 20;
  const [page, setPage] = React.useState<number>(1);
  const [tagName, setTagName] = React.useState("");
  const [debouncedTagName] = useDebouncedValue(tagName, 200);

  const start = (page - 1) * itemsPerPage;
  const end = (page - 1) * itemsPerPage + itemsPerPage;

  const {
    data: tagList,
    error,
    isLoading,
  }: TagListResponse = useAxios("/tags", {
    start,
    end,
    tagName: debouncedTagName
  });

  const totalTags = tagList?.count || 0;

  return (
    <React.Fragment>
      <Head>
        <title>Recipe Tags</title>
      </Head>
      <section>
        {isLoading && (
          <div className="flex justify-center">
            <Loader color="dark" />
          </div>
        )}
        {error && <div className="response-error">{error.message}</div>}
        {!error && tagList && (
          <>
            <TextInput
              placeholder="Search tag by name or type"
              radius="xl"
              size="md"
              className="w-4/12 mx-auto"
              value={tagName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTagName(e.target.value)
              }
            />
            {tagList.results.length > 0 ? (
              <>
                <Flex
                  justify="center"
                  direction="column"
                  align="center"
                  className="mt-10"
                >
                  <div>Tags</div>
                </Flex>

                <Pagination
                  page={page}
                  onChange={setPage}
                  total={Math.ceil(totalTags / itemsPerPage)}
                  className="mt-5"
                  position="center"
                  withEdges
                  classNames={{
                    item: "pagination_items",
                  }}
                />
              </>
            ) : (
              <div className="text-center">No tags found</div>
            )}
          </>
        )}
      </section>
    </React.Fragment>
  );
}
