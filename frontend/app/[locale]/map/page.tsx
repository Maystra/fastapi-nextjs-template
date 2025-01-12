import { generatePageMetadata } from "@/app/metadata";

export async function generateMetadata() {
	return generatePageMetadata("map_page");
}

const MapPage: React.FC = () => {
	return (
		<div className="w-full h-full min-h-[calc(100vh-64px)] flex-auto bg-green-500 flex flex-col items-center justify-center">
			<h1 className="text-4xl">Map</h1>
			<p className="text-2xl">This page is under construction. Please check back later.</p>
		</div>
	);
};

export default MapPage;
