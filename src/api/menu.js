const Menu =  [
  { header: 'Apps' },

  {
    title : 'User',
    group : 'apps',
    name  : 'bonusSetings',
    icon  : 'fa-wrench',
  },
  {
    title : 'Barang',
    group : 'apps',
    name  : 'products',
    icon  : 'fa-wrench',
  },

];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
