module.exports = {
    extends: ['wesbos'],
    rules: {
        // Add specific rules below. Example:
        // 'no-console': 'warn',
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                endOfLine: 'auto',
                tabWidth: 2
            },
        ],
    },
};
