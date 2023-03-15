import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

const TopBarProgressIndicator = () => {
	const [progress, setProgress] = useState(false);
	const [prevLocation, setPrevLocation] = useState("");
	const location = useLocation();

	useEffect(() => {
		setPrevLocation(location.pathname);
		setProgress(true);

		const hasClickedOnALink = location.pathname === prevLocation;
		if (hasClickedOnALink) {
			setPrevLocation("");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	useEffect(() => {
		setProgress(false);
	}, [prevLocation]);

	if (!progress) {
		return <></>;
	}

	return <TopBarProgress />;
};

export default TopBarProgressIndicator;
