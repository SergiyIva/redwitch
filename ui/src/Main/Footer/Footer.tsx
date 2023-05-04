import { Copyright } from "./Copyright/Copyright";
import * as S from "./Styles";
import ContactBtn from "./ContactBtn/ContactBtn";
import data from "../../LocalData/socialnet-footer-links.json";
import { Contacts } from "./Contacts/Contacts";
import { Description } from "./Description/Description";
import { SocialNets, SocialNetsProps } from "./SocialNets/SocialNets";

export const Footer = () => {
  return (
    <>
      <ContactBtn />
      <S.Footer id="contacts">
        <div className="container">
          <div className="row">
            <Description />

            <SocialNets links={data as SocialNetsProps["links"]} />
            <Contacts />
          </div>
        </div>
      </S.Footer>
      <Copyright />
    </>
  );
};
