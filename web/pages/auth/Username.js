import * as React from 'react';
import FadeIn from "react-fade-in";
import HTTPClient from "../../utils/httpClient";
import SignUpProgressBar from "../../components/SignUpProgressBar";
import Router from "next/router";

export default function Username ({
      setUserConfirmed, setStep, setStepRaw
}) {

	const [username, setUsername] = React.useState("");
	const inputRef = React.useRef(null);

	React.useEffect(() => {
		setInterval(() => {
			inputRef?.current?.focus();
		}, 100);

		HTTPClient("/auth/check", "GET").catch(err => {
			if(err.response?.data?.status === "waitlist") {
				HTTPClient("/auth/register", "POST", {
					eventId: Router.query?.eventId ? Router.query?.eventId : undefined
				}).then((res) => {
					setStepRaw(9);
				}).catch((_err) => alert("Error"));
			} else {
				// setStep(1);
			}
		})

	}, []);

	const register = () => HTTPClient("/auth/register", "POST", {
		username,
		eventId: Router.query?.eventId ? Router.query?.eventId : undefined
	}).then((res) => {
		window.localStorage.setItem("TIMESTACK_TOKEN", res.data.token);
		setStep(1);
	}).catch((_err) => alert("This username is not available."));

	return (
		<form
			style={{
				backgroundImage: `url("images/timestack city sunset 1.jpg")`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				height: "100%",
				width: "100vw",
				position: "absolute",
				top: "0",
				left: "0",
				zIndex: 1,
				margin: 0,
				overflow: "hidden"
			}}
			onSubmit={e => {
				e.preventDefault();
				register()
			}
			}>
			<div
				onClick={() => setStep(-1)}
				style={{
					display: "flex",
					justifyContent: "start",
					position: "absolute",
					top: "8.5%", left: "7%"}}
			>
				<img src={"/icons/arrow_back_ios_FILL1_wght300_GRAD0_opsz48-white.png"} alt={"Back"} width={"25"} height={"25"} />

			</div>
			<SignUpProgressBar percent={"20"}/>

			<img width={"170px"} style={{
				fill: "white",
				position: "absolute",
				top: "7%",
				left: "50%",
				transform: "translateX(-50%)"
			}} src={"images/logoglow.png"}/>
				<div style={{paddingTop: "50%"}}/>
				<div className="input-group mb-3">
					<div className="input-group mb-3 text-center" style={{borderRadius: "1rem", display: "flex",
						justifyContent: "center"}}>

						<h2 style={{color: "white", fontWeight: 500, letterSpacing: -1.5, fontSize: "20px", padding: 0, margin: 0}}>Choose your handle.</h2>
						<br/><br/>
						<input
							required={true}
							className={"sign-up-phone-number"}
							type="text"
							ref={inputRef}
							style={{
								fontSize: "30px",
								width: "100%",
								padding: 0, margin: 0,
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap'
							}}
							name={"username"}
							value={username}
							pattern="[a-zA-Z0-9]+"
							onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
							placeholder="Username"
							autoCapitalize={"none"}
							autoFocus={true}
						/>

					</div>
				</div>
				<br/>

				{/*<p style={{*/}
				{/*	position: "absolute",*/}
				{/*	bottom: "52%",*/}
				{/*	left: "50%",*/}
				{/*	transform: "translateX(-50%)",*/}
				{/*	zIndex: 999,*/}
				{/*	color: "white",*/}
				{/*	fontWeight: "500",*/}
				{/*	width: "80%",*/}
				{/*	fontSize: "14px"*/}
				{/*}}>Your email address will not be shared with anyone.</p>*/}

				<button
					type={"submit"}
					style={{
						background: "transparent",
						borderWidth: 0,
						fontSize :0,
						width: "0px",
						height: "0px",
					}}
				>
					<img alt={""} className={"white-shadow"} width={"100%"} style={{
						fill: "white",
						position: "absolute",
						bottom: "5%",
						left: "50%",
						transform: "translateX(-50%)",
						zIndex: 999
					}} src={"images/continue.png"}/>
				</button>
		</form>
	);
}