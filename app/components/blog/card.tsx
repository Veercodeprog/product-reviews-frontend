import React from "react";
import Link from "next/link";
import ImageNext from "./image";
const Card = ({ article }: { article: any }) => {
// console.log("article.attributes.image::",article.attributes)
  return (
    <Link href={`/blog/${article.attributes.slug}`}>
      <span className="uk-link-reset">
        <div className="uk-card uk-card-default uk-card-hover">
          <div className="uk-card-media-top">
        <ImageNext image={article.attributes.image} />
          </div>
          <div className="uk-card-body">
            <p className="uk-text-meta">
              {article.attributes.category.data.attributes.name}
            </p>
            <h3 className="uk-card-title uk-margin-remove-vertical">
              {article.attributes.title}
            </h3>
            <p>{article.attributes.description}</p>
          </div>
        </div>
      </span>
    </Link>
  );
};


export default Card;