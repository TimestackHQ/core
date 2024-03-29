import React from "react";
import Link from "next/link";
import FadeIn from "react-fade-in";
import Router, {useRouter} from "next/router";
import {useSelector} from "react-redux";
import ProfilePicture from "./ProfilePicture";
import NativeBridge, {shareLink, modalView, NativeNavigateBack} from "../utils/nativeBridge";

export const icons = {
	"leftArrow": "/icons/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg",
	"events": "/icons/calendar_view_day_FILL0_wght300_GRAD0_opsz48.svg",
	"share": "/icons/ios_share_FILL0_wght300_GRAD0_opsz48.svg"
}

export default function IOS ({
	children,
	main,
	buttons,
    timestackButtonLink,
	hideNavbar
}) {
	const router = useRouter();

	const user = useSelector(state => state.user);
	const notificationCount = useSelector(state => state.notificationCount);

	return (
		<div style={{backgroundColor: "white"}}>

			{main ? <FadeIn >
					<header style={{backgroundColor: "white", paddingBottom: "8px", paddingTop: 12}} className="d-flex flex-wrap mb-4 row fixed-top ">

						<div className={"col-2"}>
							<img style={{marginLeft: "20px"}} src="/icons/logo blacktimestack.svg" alt="logo" width="25px"/>
						</div>
						<div className={"col-9"}>
							<input
								className={"form-control form-control-sm"}
								style={{backgroundColor: "#EFEFF0", borderRadius: "10px", marginTop: "3px"}}
								type="text"
								placeholder="Search"
								aria-label="Search"
							/>
						</div>
					</header>
					<br/>
				</FadeIn>
				: <FadeIn >
					<header style={{backgroundColor: "white", paddingBottom: "8px", paddingTop: "50px"}} className="d-flex flex-wrap mb-4 row fixed-top ">
						<div className={"col-6"}>
							{buttons?.filter(button => button.position === "left").map((button, index) => {
								return <div onClick={() =>
									button.nativeNavigation ? button.nativeNavigation === "back" ? NativeNavigateBack() : NativeBridge.push(button.nativeNavigation(button.nativeNavigation[0], button.nativeNavigation[1])) :
										button.href === "back" ? Router.back() : router.push(button.href)
								} style={{whiteSpace: "nowrap"}} key={index} href={button.href}>
									<img style={{marginLeft: "20px"}} src={icons?.[button.icon]} alt="logo"
									     width="25px"/>
								</div>
							})}
						</div>
						
					</header>
					<br/>
					<br/>
					<br/>
				</FadeIn>
			}

				<div style={{height: "40px"}}/>
				{children}


			

		</div>


  )
}