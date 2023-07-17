
"use client";

import { useState, useRef, useEffect } from "react";
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
  };
  toggle: (id: string) => void;
  activeTab: string;
};

const Tab = (props: TabProps) => {
  const isActive = props.tab.id === props.activeTab;

  return (
    <a
      href={`#${props.tab.id}`}
      className={`my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight ${
        isActive ? "text-purple-600 border-purple-600 " : "text-neutral-500"
      } hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent`}
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
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    contentRefs.current = tabs.map(() => null);

    const options = {
      threshold: 0.5, // Adjust the threshold as needed
    };

   observer.current = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      if (activeTab !== id) {
        setActiveTab(id);
      }
    }
  });
}, options);


   tabs.forEach((tab) => {
  const ref = contentRefs.current[tabs.indexOf(tab)];
  if (ref && observer.current) { // Check if observer.current exists
    observer.current.observe(ref);
  }
});


    // Clean up the IntersectionObserver on component unmount
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    const ref = contentRefs.current.find((ref) => ref?.id === id);
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth" });
    }
  };

  const tabsTitle = tabs.map((tab) => (
    <Tab key={tab.id} tab={tab} toggle={handleTabClick} activeTab={activeTab} />
  ));

  return (
    <section>
      <div className="">
        <ul
          className="mt-0 mb-5 flex list-none flex-row overflow-x-auto w-[100%] border-b-0 pl-0"
          role="tablist"
          data-te-nav-ref
        >
          {tabsTitle}
        </ul>
      </div>
      <div className="tab-container">
        <div
          className="tab-content"
          style={{ maxHeight: "400px", overflowY: "scroll" }}
        >
          {tabs.map((tab) => (
            <div
              key={tab.id}
              id={tab.id}
              ref={(ref) => (contentRefs.current[tabs.indexOf(tab)] = ref)}
              className={`${activeTab === tab.id ? "active" : ""}`}
            >
              {tab.id === "tab1" && (
                <>
                  <h2 className="text-3xl font-bold mb-4">{tab.title}</h2>
                  <OverviewTab />
                </>
              )}

              {tab.id === "tab2" && (
                <>
                  <h2 className="text-3xl font-bold mb-4">{tab.title}</h2>
                  <FeaturesTab />
                </>
              )}
              {tab.id === "tab3" && (
                <>
                  <h2 className="text-3xl font-bold mb-4">{tab.title}</h2>
                  <FoundersTab />
                </>
              )}
              {tab.id === "tab4" && (
                <>
                  <h2 className="text-3xl font-bold mb-4">{tab.title}</h2>
                  <ReviewTab product={props.product} />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

