const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
      react: 'react',
      'react-dom': 'react-dom',
      'c2-react-picklist': path.resolve('../src')
    }
  }
})
