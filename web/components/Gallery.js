import MediaView from "./MediaView";
import React from "react";
import HTTPClient from "../utils/httpClient";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Gallery ({eventId}) {

	const [gallery, setGallery] = React.useState([]);
	const [moreToLoad, setMoreToLoad] = React.useState(true);

	const getGallery = () => HTTPClient(`/events/${eventId}/media?skip=${gallery.length}`, "GET")
		.then(res => {
			setGallery([...gallery, ...res.data.media]);
			if (res.data.media.length === 0) setMoreToLoad(false);
		});

	React.useEffect(() => {
		getGallery().then(_r => {});
	}, []);



	return (
		<React.Fragment>
			<InfiniteScroll
				id="preload"
				className={"row "}
				dataLength={gallery.length} //This is important field to render the next data
				next={getGallery}
				hasMore={moreToLoad}
				loader={<h4></h4>}
				endMessage={
					<p style={{ textAlign: 'center' }}>
						<b></b>
					</p>
				}
				// below props only if you need pull down functionality
				refreshFunction={() => {
					setGallery([]);
					setMoreToLoad(true)
					getGallery();
				}}
				pullDownToRefresh
				pullDownToRefreshThreshold={10}
				pullDownToRefreshContent={
					<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
				}
				releaseToRefreshContent={
					<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
				}
			>
				{gallery?.map((media, i) => {
					return (
						<div key={i} className={"col-4"} style={{margin: 0, padding: 1}}>
							<MediaView media={media}/>
						</div>
					);
				})}
			</InfiniteScroll>
		</React.Fragment>
	);
}