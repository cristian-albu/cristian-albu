import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import slugify from "@/lib/slugify";
import { CaseStudy } from "@prisma/client";
import { instanceOfCaseStudyData } from "@/lib/instanceOfCaseStudy";
import MDComponent from "./Editor/MDComponent";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { MdSave } from "react-icons/md";

const localStorageKey = "ca_draft";

const CaseStudyComponent = ({
  data,
  setData,
  setReadyForPublish,
}: {
  data?: CaseStudy;
  setData: Dispatch<SetStateAction<CaseStudy>>;
  setReadyForPublish: Dispatch<SetStateAction<boolean>>;
}) => {
  const [canSave, setCanSave] = useState(false);

  const idState = data?.id ?? "";
  const [titleState, setTitle] = useState(data?.title ?? "");
  const [slugState, setSlug] = useState(data?.slug ?? "");
  const [mdContent, setMdContent] = useState(data?.content ?? "");
  const [mainImageState, setMainImageState] = useState(data?.mainImage ?? "");
  const [descriptionState, setDescriptionState] = useState(
    data?.description ?? ""
  );

  useEffect(() => {
    if (typeof window !== undefined) {
      if (
        localStorage.getItem(localStorageKey) !== null &&
        localStorage.getItem(localStorageKey) !== undefined
      ) {
        const stored = localStorage.getItem(localStorageKey);

        const storedParsed = JSON.parse(stored!);

        if (instanceOfCaseStudyData(storedParsed)) {
          if (!data?.title && !data?.slug && !data?.content) {
            setTitle(storedParsed.title);
            setSlug(storedParsed.slug);
            setMdContent(storedParsed.content);
            setMainImageState(storedParsed.mainImage);
          }
        }
      }
    }
  }, []);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setSlug(slugify(event.target.value));
  };

  const onSave = () => {
    const editorData: CaseStudy = {
      id: idState,
      title: titleState,
      slug: slugState,
      mainImage: mainImageState,
      content: mdContent,
      description: descriptionState,
    };

    if (
      editorData.title.length < 125 &&
      editorData.slug.length < 125 &&
      editorData.content.length < 65000 &&
      editorData.title.length > 0 &&
      editorData.slug.length > 0 &&
      editorData.content.length > 0 &&
      editorData.description.length > 0 &&
      mainImageState.startsWith("https://res.cloudinary.com")
    ) {
      setData(editorData);
      localStorage.setItem(localStorageKey, JSON.stringify(editorData));
      setCanSave(false);
      setReadyForPublish(true);
    }
  };
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      onChange={() => setCanSave(true)}
      className="w-full"
    >
      <div className="w-full  grid grid-cols-2 gap-x-10 gap-y-5 mb-5 items-start">
        <div className="">
          <label htmlFor="title">Title:</label>
          <input
            name="title"
            type="text"
            placeholder="Title..."
            value={titleState}
            onChange={(event) => handleTitleChange(event)}
            className={`inputPrimary mb-5 ${
              titleState.length > 125 && "border-red-500"
            }`}
          />
          <label htmlFor="slug">Slug:</label>
          <input
            name="slug"
            type="text"
            placeholder="Slug..."
            value={slugState}
            onChange={({ target }) => setSlug(target.value)}
            className={`inputPrimary mb-5 ${
              slugState.length > 125 && "border-red-500"
            }`}
          />
          <label htmlFor="description">Description:</label>
          <input
            name="description"
            type="text"
            placeholder="Description..."
            value={descriptionState}
            onChange={({ target }) => setDescriptionState(target.value)}
            className={`inputPrimary mb-5 ${
              descriptionState.length > 255 && "border-red-500"
            }`}
          />
          <label htmlFor="mainImg">Main Image:</label>
          <input
            name="mainImg"
            type="text"
            placeholder="Image link..."
            value={mainImageState}
            onChange={({ target }) => setMainImageState(target.value)}
            className={`inputPrimary mb-5 ${
              !mainImageState.startsWith("https://res.cloudinary.com") &&
              mainImageState.length > 0 &&
              "border-red-500"
            }`}
          />
          <div>
            <label htmlFor="content">Content:</label>
            <textarea
              name="content"
              value={mdContent}
              onChange={(event) => setMdContent(event.target.value)}
              placeholder="Content..."
              className={`inputPrimary w-full min-h-[350px] text-sm mt-3 ${
                mdContent.length > 65000 && "border-red-500"
              }`}
            />
          </div>
        </div>

        <div className="mt-5 bg-white shadow-xl p-5 rounded-lg">
          <div className="grid items-start w-full justify-between grid-cols-6">
            <div className="row-span-2 col-span-1">
              {mainImageState.startsWith("https://res.cloudinary.com") && (
                <Image src={mainImageState} width={50} height={50} alt="" />
              )}
            </div>

            <p className="text-2xl col-span-4">{titleState}</p>
            <button
              className={`btnPrimary disabled:bg-gray-300 disabled:cursor-not-allowed row-span-2`}
              disabled={
                titleState.length >= 125 ||
                slugState.length >= 125 ||
                mdContent.length >= 65000 ||
                titleState.length < 1 ||
                slugState.length < 1 ||
                mdContent.length < 1 ||
                descriptionState.length > 255 ||
                descriptionState.length < 1 ||
                !mainImageState.startsWith("https://res.cloudinary.com") ||
                !canSave
              }
              onClick={onSave}
            >
              <MdSave />
              Save
            </button>
            <p className="mb-5 col-span-4">{slugify(titleState)}</p>
            <p className="col-span-6 mb-5">{descriptionState}</p>
          </div>

          <div className="w-full flex flex-col justify-start items-start">
            <label>Content preview:</label>
            <div className="prose w-full ">
              <ReactMarkdown
                children={mdContent}
                components={MDComponent}
                className="w-full h-[480px] overflow-auto pr-2"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CaseStudyComponent;
