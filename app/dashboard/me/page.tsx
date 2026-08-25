import MePageContent from "@/components/dashboard/MePageContent";
import { getSeetings } from "@/lib/auth";

const fetchSettings = async () => {
	const res = await getSeetings();
	return res.settings;
};

const MePage = async () => {
	const settings = await fetchSettings();

	return <MePageContent data={settings} />;
};

export default MePage;
