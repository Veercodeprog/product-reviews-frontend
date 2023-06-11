import Reviews from "./products-description/reviews"

function ReviewTab(props:any) {
return(
<>
<section className="mb-20" >
<div className=" reviews">
<Reviews product={props.product} />
</div>
</section>
</>
)

}

export default  ReviewTab