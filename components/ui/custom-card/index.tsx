import { CUSTOM_CARD } from "../../../data";
import { Card } from "../m-ui";

export const CustomCard = (props: CUSTOM_CARD) => {
  const { children } = props;
  return <Card {...props}>{children}</Card>;
};
