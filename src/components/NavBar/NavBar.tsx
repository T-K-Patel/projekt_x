import { useState } from "react";
import "./NavBar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Bars from "../../assets/bars.svg";
import Cross from "../../assets/xmark-solid.svg";
import { Nav, Navbar } from "react-bootstrap";
import Home from "../../assets/material-symbols_home.svg";
import FAQs from "../../assets/material-symbols_faqs.svg";
import { delJWT, getJWT, LogoutUser } from "../../utils/api";

function NavBar() {
	const navigate = useNavigate();
	const [isToogle, setToogle] = useState(false);
	window.addEventListener("click", function (e: any) {
		if (
			!(
				document.getElementById("SidePanel")?.contains(e.target) ||
				document.getElementById("tooglebtn")?.contains(e.target)
			)
		) {
			if (isToogle) {
				setToogle(false);
			}
		}
	});
	const handleOnClick = () => {
		setToogle(true);
	};
	const hidePannel = () => {
		setToogle(false);
	};

	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	return (
		<>
			<Navbar
				expand="lg"
				style={{
					color: "#FFFFFF",
					zIndex: "98",
					width: "100%",
					position: "fixed",
					backgroundColor: "rgba(0, 0, 0, 0.2)",
					minHeight: "1.2em",
					top: "0",
					left: "0",
					backdropFilter: "blur(0.8px)",
					alignItems: "center",
				}}
				variant="dark"
			>
				<div className="links">
					<div id="links-left">
						<img
							src={Bars}
							width="22px"
							style={{ cursor: "pointer" }}
							id="tooglebtn"
							onClick={!isToogle ? handleOnClick : () => { }}
							alt="&#8801;"
						/>

						<Nav className="content-to-hide">
							<Link to="/" style={{ textDecoration: "none", color: "white", alignItems: "center" }}>
								<h2>Projekt-X</h2>
							</Link>
						</Nav>
					</div>
					<div
						style={{
							alignItems: "center",
							display: "flex",
							flexDirection: "row",
						}}
					>
						{getJWT() !== null ? (
							<Nav
								className={`ms-auto h4 d-inline-flex`}
								style={{
									fontFamily: "Quincy",
									marginRight: "2vw",
								}}
							>

								<NavLink
									to={"/dashboard"}
									className="navButton"
									style={{ marginLeft: "auto", color: "black" }}
								>
									Dashboard
								</NavLink>

							</Nav>)
							: (null)}

						<Nav
							className={`ms-auto h4 d-inline-flex`}
							style={{
								fontFamily: "Quincy",
								marginRight: "2vw",
							}}
						>
							{getJWT() === null ? (
								<NavLink
									to={"/login"}
									className="navButton"
									style={{ marginLeft: "auto", color: "black" }}
								>
									Log In
								</NavLink>
							) : (
								<button
									className="navButton"
									onClick={() => {
										if (window.confirm("Are you sure you want to logout?")) {
											LogoutUser(navigate);
											hidePannel();
										}
									}}
								>
									Logout
								</button>
							)}
						</Nav>
					</div>
				</div>
			</Navbar>
			{isToogle && <div
				className="BodyBlur"
				style={{ backdropFilter: "blur(1px) opacity(1)", zIndex: "99" }}
			></div>}
			<div
				className="SidePanel"
				id="SidePanel"
				style={!isToogle ? { left: "-100%" } : {}}
			>
				<div className="SidePannel-toggle-Btn">
					<img
						src={Cross}
						width="22px"
						style={{ cursor: "pointer" }}
						onClick={hidePannel}
						alt="X"
					/>
				</div>

				<h2 style={{ color: "#fff35f" }}>Projekt-X</h2>
				<div className="TemplateLinks">
					<ul id="PostLoginNavLinks">
						<li>
							<NavLink onClick={hidePannel} to="/">
								{/* <img src={Home} alt="Home" /> */}
								Home
							</NavLink>
						</li>
						<li>
							<NavLink onClick={hidePannel} to="/gallery">
								{/* <img src={GalleryImg} alt="Home" /> */}
								Gallery
							</NavLink>
						</li>
						<li>
							<NavLink onClick={hidePannel} to="/workshops">
								{/* <img src={EventsImg} alt="Home" /> */}
								Workshops
							</NavLink>
						</li>
						<li>
							<NavLink onClick={hidePannel} to="/faq">
								{/* <img src={FAQs} alt="Home" /> */}
								FAQs
							</NavLink>
						</li>
						<li>
							<NavLink onClick={hidePannel} to="/team">
								{/* <img src={Team} alt="Home" /> */}
								Team
							</NavLink>
						</li>
						<li>
							<NavLink onClick={hidePannel} to="/query">
								{/* <img src={Team} alt="Home" /> */}
								Query
							</NavLink>
						</li>
						<li>
							<NavLink onClick={hidePannel} to="/aboutus">
								{/* <img src={AboutImg} alt="Home" /> */}
								About Us
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}

export default NavBar;
