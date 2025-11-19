module.exports = {
  extends: [
    'stylelint-config-standard'
  ],
  plugins: [
    'stylelint-order'
  ],
  rules: {
    // Базовые правила
    'indentation': 2,
    'string-quotes': 'single',
    
    // Правила порядка свойств
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'flex-direction',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'width',
      'height',
      'margin',
      'padding',
      'border',
      'background',
      'color',
      'font',
      'text-decoration',
      'text-transform',
      'opacity',
      'transition',
      'animation'
    ],
    
    // Дополнительные правила (по желанию)
    'selector-class-pattern': null, // Отключает проверку имен классов
    'no-descending-specificity': null, // Отключает проверку специфичности
    'declaration-empty-line-before': null, // Отключает пустые строки перед объявлениями
    'order/properties-alphabetical-order': true,
  }
};