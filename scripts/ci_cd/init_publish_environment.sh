npm config set proxy $HTTP_PROXY;
echo "Printing CA variable";
echo $IAV_CA_BUNDLE;
echo "Should have printed";
npm config set cafile $IAV_CA_BUNDLE;
echo "successfull"
