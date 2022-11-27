const { useEffect } = require("react");

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Used Carz`;
  }, [title]);
};

export default useTitle;
