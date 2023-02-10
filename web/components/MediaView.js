import {useEffect, useState} from "react";
import HTTPClient from "../utils/httpClient";
import FadeIn from "react-fade-in";
import ContentLoader from 'react-content-loader'
import { LazyLoadImage } from "react-lazy-load-image-component";


export default function MediaView ({publicId}) {


	const [uri, setUri] = useState("");

	useEffect(() => {
		HTTPClient("/media/"+publicId+"?thumbnail=true").then(res => setUri(res.data))
			.catch(err => {});
	}, [])

	// if(!uri) return <ContentLoader
	// 	width={"100%"}
	// 	height={"100%"}
	// 	viewBox="0 0 450 600"
	// 	backgroundColor="#f0f0f0"
	// 	foregroundColor="#dedede"
	// >
	// 	<rect x="0" y="0" rx="1" ry="1" width="100%" height="100%" />
	// </ContentLoader>;

	if(!uri) return null

	// return (
	// 	<video
	// 		className={"lazy"}
	// 		style={{objectFit: "cover"}}
	// 		width={"100%"}
	// 		height={"230px"}
	// 		autoPlay muted loop playsInline
	// 		poster={"/images/loader.svg"}
	// 	>
	// 		<source src={uri}/>
	// 	</video>
	// );
	return <FadeIn >
		<LazyLoadImage src={uri}
           style={{objectFit: "cover", margin: 0, padding: 0}}
           alt="Image Alt"
           width={"100%"} height={"200px"}
		/>
	</FadeIn>
}