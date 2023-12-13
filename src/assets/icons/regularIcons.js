import { library } from "@fortawesome/fontawesome-svg-core";

import { faSquare, faCalendar } from "@fortawesome/free-regular-svg-icons";

const regularIcons = () => {
  return library.add(faSquare, faCalendar);
};

export default regularIcons;
