# Prompt user for name of package:
echo "Please enter a name for the new dictionary package:"
read name

PACKAGE_DIRECTORY_PATH="${PWD}/packages/${name}"
TEMPLATE_DIRECTORY_PATH="${PWD}/scripts/fixtures"

# build package structure:
mkdir "${PACKAGE_DIRECTORY_PATH}"
mkdir "${PACKAGE_DIRECTORY_PATH}/src"
cp "${TEMPLATE_DIRECTORY_PATH}/index.ts" "${PACKAGE_DIRECTORY_PATH}/src/index.ts"
cp "${TEMPLATE_DIRECTORY_PATH}/dictionary.ts" "${PACKAGE_DIRECTORY_PATH}/src/dictionary.ts"
cp "${TEMPLATE_DIRECTORY_PATH}/types.ts" "${PACKAGE_DIRECTORY_PATH}/src/types.ts"
cp "${TEMPLATE_DIRECTORY_PATH}/rollup.json" "${PACKAGE_DIRECTORY_PATH}/src/rollup.json"
cp "${TEMPLATE_DIRECTORY_PATH}/ts_config.json" "${PACKAGE_DIRECTORY_PATH}/tsconfig.json"
cp "${TEMPLATE_DIRECTORY_PATH}/package.json" "${PACKAGE_DIRECTORY_PATH}/package.json"

# update files to be package-specific:
ts-node "${PWD}/scripts/replace.ts" "${PACKAGE_DIRECTORY_PATH}/package.json" "PACKAGE_NAME" "${name}"
ts-node "${PWD}/scripts/replace.ts" "${PACKAGE_DIRECTORY_PATH}/src/index.ts" "\/\/\s" ""
ts-node "${PWD}/scripts/replace.ts" "${PACKAGE_DIRECTORY_PATH}/src/dictionary.ts" "\/\/\s" ""
