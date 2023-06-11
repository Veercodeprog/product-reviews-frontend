'use client'
import { useState, useRef,RefObject } from "react";
import OverviewTab from "./Overview-tab-section";
import ReviewTab from "./Reviews-tab-section";
import FoundersTab from "./Founders-tab-section";
import FeaturesTab from "./Features-tab-section";

const tabs = [
  { id: "tab1", title: "Overview" },
  { id: "tab2", title: "Features" },
  { id: "tab3", title: "Team" },
  { id: "tab4", title: "Reviews" },
];

type TabProps = {
  tab: {
    id: string;
    title: string;
    // other properties of the tab object
  };
  toggle: (id: string) => void;
};

const Tab = (props: TabProps) => {
  const isActive = props.tab.id;

  return (
    <a
      href={`#${props.tab.id}`}
      className={`my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent ${
        isActive ? "active" : ""
      }`}
      onClick={(e) => {
        e.preventDefault();
        props.toggle(props.tab.id);
      }}
    >
      {props.tab.title}
    </a>
  );
};

export default function TabSection(props: any) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const contentRefs = useRef<(any | null)[]>([]);

// if (contentRefs.current.length === 0) {
//     contentRefs.current = tabs.map(() => useRef<HTMLDivElement | null>(null));
//   }
 const handleTabClick = (id: string) => {
    setActiveTab(id);
    const ref = contentRefs.current.find((ref) => ref?.current?.id === id);
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const tabsContent = tabs.map((tab) => (
    <Tab key={tab.id} tab={tab} toggle={handleTabClick} />
  ));

  return (
    <section>
      <div className="">
        <ul
          className=" mt-o mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0"
          role="tablist"
          data-te-nav-ref
        >
          {tabsContent}
        </ul>
      </div>
      <div className="tab-container">
        <div className="tab-content" style={{ maxHeight: "400px", overflowY: "scroll" }}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              id={tab.id}
              ref={contentRefs.current[tabs.indexOf(tab)]}
              className={`${activeTab === tab.id ? "active" : ""}`}
            >

      {tab.id === "tab1" && (
  <>
    <h2 className="text-3xl font-bold mb-4">{tab.title}</h2>
    <OverviewTab />
  </>
)}

              {tab.id === "tab2" && 
  <>
    <h2 className="text-3xl font-bold mb-4">{tab.title}</h2>
<FeaturesTab />
</>
}
              {tab.id === "tab3" && 
  <>
    <h2 className="text-3xl font-bold mb-4">{tab.title}</h2>
<FoundersTab />
</>
}
              {tab.id === "tab4" && 
  <>
    <h2 className="text-3xl font-bold mb-4">{tab.title}</h2>
<ReviewTab product={props.product} />
</>
}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
