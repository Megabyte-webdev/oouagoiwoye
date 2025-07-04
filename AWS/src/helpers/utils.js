const bucketName = process.env.AWS_BUCKET_NAME;
const bucketLocation = process.env.AWS_BUCKET_LOCATION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const currencyFormatter = (amount) => {
    const formatter = new Intl.NumberFormat('en-NG', {
        style: "currency",
        currency: "NGN",
        currencyDisplay: "symbol",
    });
    return formatter.format(amount);
}

module.exports ={
    bucketName,
    bucketLocation,
    accessKey,
    secretAccessKey,
    currencyFormatter
}