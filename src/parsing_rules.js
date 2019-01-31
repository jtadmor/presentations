const Projects = [{
  key: 'name',
  match_element: 'H1'
}, {
  key: 'tags',
  condition: node => node.nodeName === 'SPAN' && node.style && node.style.color === 'green',
  getValue: node => (node.textContent ? node.textContent.split(', ') : [])
}]

export default { Projects }
