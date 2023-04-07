import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import MarkDownEditor from "@/components/admin/Editor/MarkDownEditor";
import slugify from "@/lib/slugify";
import { CaseStudyData } from "./AddCaseStudy";

function instanceOfCaseStudyData(object: any): object is CaseStudyData {
  return "title" && "slug" && "content" in object;
}

const localStorageKey = "ca_draft";

const CaseStudy = ({
  data,
  setData,
}: {
  data?: CaseStudyData;
  setData: Dispatch<SetStateAction<CaseStudyData>>;
}) => {
  const [canSave, setCanSave] = useState(true);
  const [titleState, setTitle] = useState(data?.title ?? "");
  const [slugState, setSlug] = useState(data?.slug ?? "");
  const [mdContent, setMdContent] = useState(data?.content ?? "");

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
    const data = {
      title: titleState,
      slug: slugState,
      content: mdContent,
    };

    if (
      data.title.length < 125 &&
      data.slug.length < 125 &&
      data.content.length < 65000 &&
      data.title.length > 0 &&
      data.slug.length > 0 &&
      data.content.length > 0
    ) {
      setData(data);
      localStorage.setItem(localStorageKey, JSON.stringify(data));
      setCanSave(false);
    }
  };
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      onChange={() => setCanSave(true)}
      className="w-full"
    >
      <div className="w-full  grid grid-cols-2 gap-x-5 gap-y-5 mb-5 items-start">
        <div>
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
            className={`inputPrimary ${
              slugState.length > 125 && "border-red-500"
            }`}
          />
        </div>

        <div className="mt-5">
          <p className="text-3xl">{titleState}</p>
          <p>{slugify(titleState)}</p>
        </div>
      </div>
      <MarkDownEditor content={mdContent} setContent={setMdContent} />
      <div className="w-full flex">
        <button
          className={`btnPrimary disabled:bg-gray-300 disabled:cursor-not-allowed `}
          disabled={
            titleState.length >= 125 ||
            slugState.length >= 125 ||
            mdContent.length >= 65000 ||
            titleState.length < 1 ||
            slugState.length < 1 ||
            mdContent.length < 1 ||
            !canSave
          }
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CaseStudy;
