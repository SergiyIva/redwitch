import * as S from "../Styles";
import {
  FaInstagram,
  FaOdnoklassniki,
  FaTwitter,
  FaVk,
  FaYoutube
} from "react-icons/fa";

type svgTypes = "vk" | "youtube" | "twitter" | "odnoklassniki" | "instagram";
export type SocialNetsProps = {
  links: {
    name: string;
    svg: svgTypes;
    href: string;
  }[];
};
export const SocialNets = ({ links }: SocialNetsProps) => {
  return (
    <div className="col-lg-3">
      <S.Heading>Мы в соцсетях</S.Heading>
      <S.LinksContainer className="fa-ul mb-lg-4 mb-0 p-0">
        {links.map(({ name, svg, href }) => (
          <li key={svg}>
            <S.Link href={href}>
              {svg === "vk" && <FaVk />}
              {svg === "youtube" && <FaYoutube />}
              {svg === "twitter" && <FaTwitter />}
              {svg === "odnoklassniki" && <FaOdnoklassniki />}
              {svg === "instagram" && <FaInstagram />}
              {name}
            </S.Link>
          </li>
        ))}
      </S.LinksContainer>
    </div>
  );
};
