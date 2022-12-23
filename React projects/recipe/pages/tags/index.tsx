import Head from "next/head";
import React from "react";
import { useAxios, CustomAxiosResponse } from "../../hooks/useAxios";
import { TagListType } from "../api/tags";
import { TextInput, Loader } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import ListPagination from "../../components/molecules/ListPagination";
import styles from "../../styles/modules/TagList.module.scss";
import Link from "next/link";
import Header from "../../components/organisms/Header";

type TagListResponse = CustomAxiosResponse<TagListType>;

export default function TagList() {
  const itemsPerPage = 30;
  const [page, setPage] = React.useState<number>(1);
  const [tagName, setTagName] = React.useState("");
  const [debouncedTagName] = useDebouncedValue(tagName, 500);

  const start = (page - 1) * itemsPerPage;
  const end = (page - 1) * itemsPerPage + itemsPerPage;

  const {
    data: tagList,
    error,
    isLoading,
  }: TagListResponse = useAxios("/tags", {
    start,
    end,
    tagName: debouncedTagName,
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
            <Header className="text-4xl mt-10 mb-12">
              {tagList.results.length > 0 ? "Available Tags" : "No tags found"}
            </Header>
            {tagList.results.length > 0 && (
              <>
                <div className={styles["tag-list"]}>
                  {tagList.results.map((tag, idx) => {
                    return (
                      <Link
                        href={{
                          pathname: "/tags/[tagID]/recipes",
                          query: {
                            tagID: tag.id,
                            tagName: encodeURIComponent(
                              tag.display_name +
                              " (" +
                              tag.type.split("_").join(" ") +
                              ")"
                            ),
                          },
                        }}
                        className={[
                          styles["tag-list__item"],
                          "btn",
                          "btn-dark",
                        ].join(" ")}
                      >
                        {tag.display_name} ({tag.type.split("_").join(" ")})
                      </Link>
                    );
                  })}
                </div>
                <ListPagination
                  page={page}
                  onPageChange={setPage}
                  totalPages={Math.ceil(totalTags / itemsPerPage)}
                  className="my-5"
                  itemClassName="pagination_items"
                />
              </>
            )}
          </>
        )}
      </section>
    </React.Fragment>
  );
}
