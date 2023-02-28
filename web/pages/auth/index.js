import * as React from "react";
import FadeIn from "react-fade-in";
import InitLogin from "./InitLogin";
import httpClient from "../../utils/httpClient";
import Code from "./Code";
import Welcome from "./Welcome";
import {useDispatch} from "react-redux";
import {userInitRoutine} from "../../utils/auth";
import FirstAndLastNames from "./FirstAndLastNames";
import Step0 from "./Step0";
import Step1 from "./Step1";
import Email from "./Email";
import {useEffect} from "react";
import Router from "next/router";
import * as PropTypes from "prop-types";
import Birthdate from "./Birthdate";
import Adventure from "./Adventure";
import Username from "./Username";

export default function Login() {

	const dispatch = useDispatch();

	const [error, setErrorRaw] = React.useState("");
	const setError = (err) => {
		setErrorRaw(err);
		setTimeout(() => {
			setErrorRaw("");
		}, 5000);
	}
	const [step, setStepRaw] = React.useState(0);
	const setStep = (increment) => {
		setStepRaw(step + increment);
		setError("");
	}
	const [phoneNumber, setPhoneNumber] = React.useState("");
	const [code, setCode] = React.useState("");

	const [userConfirmed , setUserConfirmed] = React.useState(false);

	useEffect(() => {
		if(userConfirmed) Router.push("/main_ios");
	}, [userConfirmed]);


	const initLogin = (nextStep = true) => {
		httpClient("/auth/login", "POST", {phoneNumber: "+1"+String(phoneNumber)})
			.then((_res) => setStep(nextStep ? 1 : 0))
			.catch((_err) => setError("The phone number you entered is invalid"));
	}

	const confirmCode = () => {
		httpClient("/auth/confirm-login", "POST", {
			username: "+1"+phoneNumber,
			code: code
		})
		.then((res) => {
			window.localStorage.setItem("TIMESTACK_TOKEN", res.data.token);
			window.ReactNativeWebView?.postMessage(JSON.stringify({
				request: "session",
				session: res.data.token
			}));
			dispatch({type: "SET_USER", payload: userInitRoutine()});
			if(res.data.message === "User confirmed") {
				setUserConfirmed(true);
				return;
			}
			setStep(1);
		})
		.catch((_err) => alert("The code is incorrect.\n Try again."));
	}

	return (
		<div style={{
			backgroundImage: "hey.svg",
			overflow: "hidden"
		}} className={"container"}>
			<div className={"content"} style={{overflow: "hidden"}}>

				<div className="row justify-content-center align-items-center ">
					<div className="col-lg-5 col-sm-10 text-center ">



						{step === 0 ? <Step0
							setStep={setStep}
						/> : null}



						{step === 1 ? <InitLogin
							setStep={setStep}
							phoneNumber={phoneNumber}
							setPhoneNumber={setPhoneNumber}
							initLogin={initLogin}
							error={error}
						/> : null}
						{step === 2 ? <Code
							code={code}
							setCode={setCode}
							setStep={setStep}
							confirmCode={confirmCode}
							phoneNumber={phoneNumber}
							initLogin={initLogin}
							error={error}
							timeRemaining={1}
						/> : null}

						{step === 3 ? <Step1
							setStep={setStep}
						/> : null}

						{step === 4 && userConfirmed ? <div>
							<Welcome/>
						</div> : null}

						{step === 4 && !userConfirmed ? <div>
							<Username
								setStep={setStep}
								setUserConfirmed={setUserConfirmed}
							/>
						</div> : null}

						{step === 5 && !userConfirmed ? <div>
							<FirstAndLastNames
								setStep={setStep}
								setUserConfirmed={setUserConfirmed}
							/>
						</div> : null}

						{step === 6 && !userConfirmed ? <div>
							<Birthdate
								setStep={setStep}
								setUserConfirmed={setUserConfirmed}
							/>
						</div> : null}

						{step === 7 && !userConfirmed ? <div>
							<Email
								setStep={setStep}
								setUserConfirmed={setUserConfirmed}
							/>
						</div> : null}

						{step === 8 ? <div>
							<Adventure
								setStep={setStep}
								setUserConfirmed={setUserConfirmed}
							/>
						</div> : null}

					</div>
				</div>
			</div>
		</div>
	);

}