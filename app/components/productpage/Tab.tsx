'use client';
import { useState, useEffect } from "react";
import OverviewTab from "./Overview-tab-section";
import ReviewTab from "./Reviews-tab-section";
import FoundersTab from "./Founders-tab-section";
import FeaturesTab from "./Features-tab-section";
const tabs = [
  { id: "tab1", title: "Overview" },
  { id: "tab2", title: "Features" },
  { id: "tab3", title: "Founders" },
  { id: "tab4", title: "Reviews" },
];
type TabProps = {
  tab: {
    id: string;
    // other properties of the tab object
  };
};

const Tab = (props: TabProps) => {
  const isActive = props.tab.id;

  return (
    <a
      href={`#${props.tab.id}`}
      className={`tab ${
        isActive ? "active" : ""
      } my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent    `}
      onClick={(e) => {
        e.preventDefault();
        props.toggle(props.tab.id);
      }}
    >
      {props.tab.title}
    </a>
    // <a
    //   href={`#${props.tab.id}`}
    //   className={`tab ${isActive ? "active" : ""}`}
    //   onClick={(e) => {
    //     e.preventDefault();
    //     props.toggle(props.tab.id);
    //   }}
    // >
    //   {props.tab.title}
    // </a>
  );
};
export default function TabSection(){
 const [activeTab, setActiveTab] = useState(tabs[0].id);

  function handleTabClick(id) {
    setActiveTab(id);
  }

  const tabsContent = tabs.map((tab) => (
    <Tab key={tab.id} tab={tab} toggle={() => handleTabClick(tab.id)} />
  ));
return(
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
          <div className="tab-content">
            <div
              id="tab1"
              className={`tab-pane ${activeTab === "tab1" ? "active" : ""}`}
            >
              {/* Tab 1 content  */}
<OverviewTab />
            </div>
            <div
              id="tab2"
              className={`tab-pane ${activeTab === "tab2" ? "active" : ""}`}
            >
           <FeaturesTab />
            </div>
            <div
              id="tab3"
              className={`tab-pane ${activeTab === "tab3" ? "active" : ""}`}
            >
             Founders Content
            </div>
            <div
              id="tab4"
              className={`tab-pane ${activeTab === "tab4" ? "active" : ""}`}
            >
              Reviews Content
            </div>
          </div>
        </div>
      </section>
)
}