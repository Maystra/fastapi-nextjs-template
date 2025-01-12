import { generatePageMetadata } from "@/app/metadata";
import Character from "./component";

export async function generateMetadata() {
	return generatePageMetadata("character_page");
}
const CharacterPage: React.FC = () => {
	return (
		<div className="w-full h-full min-h-[calc(100vh-64px)] flex-auto flex flex-col items-center justify-center">
			<Character />
		</div>
	);
};

export default CharacterPage;
