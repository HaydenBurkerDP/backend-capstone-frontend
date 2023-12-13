import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faPlus,
  faXmark,
  faChevronUp,
  faChevronDown,
  faCheck,
  faPenToSquare,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";

const solidIcons = () => {
  return library.add(
    faPlus,
    faXmark,
    faChevronUp,
    faChevronDown,
    faCheck,
    faPenToSquare,
    faShareNodes
  );
};

export default solidIcons;
