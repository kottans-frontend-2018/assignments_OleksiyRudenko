/**
 * Creates an HTML element
 * @param {object} options
 * @returns {HTMLElement}
 *
 * options: { tag:string,
 *            id:string,
 *            classList:string|[...string],
 *            attr: {attr-name:attr-value},
 *            children:HTMLElement|[...HTMLElement] }
 */
export const createElement = function(options={tag:'div'}) {
  if (!options) options = 'div';
  if (typeof options === 'string' || options instanceof String) {
    options = { tag: options };
  }
  if (!options.tag) {
    options.tag = 'div';
  }
  const element = document.createElement(options.tag);
  if (!!options.id) element.id = options.id;
  if (!!options.classList) {
    if (typeof options.classList === 'string' || options.classList instanceof String) {
      options.classList = [ options.classList ];
    }
    options.classList.forEach(className => { element.classList.add(className);});
  }
  if (!!options.attr) {
    Object.keys(options.attr).forEach(key => {
      element.setAttribute(key, options.attr[key]);
    });
  }
  if (!!options.children) {
    if (!Array.isArray(options.children)) options.children = [options.children];
    options.children.forEach(child => {
      element.appendChild(child);
    });
  }
  return element;
};

/**
 * Clones element reassigning id
 * @param {HTMLElement} node
 * @param {string} id
 * @param {boolean=true} deep
 * @returns {HTMLElement}
 */
export const cloneNodeAs = function(node, id, deep = true) {
  const element = node.cloneNode(deep);
  element.id = id;
  return element;
};
