import React from "react";
import Link from "next/link";
import ImageNext from "./image";
const Card = ({ article }: { article: any }) => {
  return (
    <Link className="no-underline	" href={`/blog/${article.attributes.slug}`}>
      <span className="uk-link-reset">
        <div className="uk-card uk-card-default uk-card-hover">
          <div className="uk-card-media-top">
            <ImageNext image={article.attributes.image} />
          </div>
          <div className="mb-6 mt-3 px-4">
            <p className="uk-text-meta rounded-full text-sm px-2 py-1 capitalize text-white bg-gray-500 inline">
              {article.attributes.category.data.attributes.name}
            </p>
            <h3 className="font-medium mt-3 text-2xl">
              {article.attributes.title}
            </h3>
            <p className="leading-relaxed">{article.attributes.description}  </p>
          </div>
        </div>
      </span>
    </Link>
  );
};

export default Card;
