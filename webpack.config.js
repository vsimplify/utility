const path = require('path');

module.exports = {
  entry: {
    'DcssChildrenForm': './src/main/typescript/forms/DcssChildrenForm.tsx',
    'DcssDependentForm': './src/main/typescript/forms/DcssDependentForm.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'target/classes/META-INF/resources/js'),
    filename: '[name].js',
    library: {
      type: 'umd',
      name: '[name]'
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    '@patternfly/react-core': 'PFReactCore'
  },
  mode: 'production',
  optimization: {
    minimize: true
  }
};
