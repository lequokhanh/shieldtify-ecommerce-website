import product_img from '../../assets/Product/image-product.svg'
import product_img2 from '../../assets/Product/tv.svg'
import product_img3 from '../../assets/Product/mobile.svg'
export const testdata = {
    name: `Monitor Cooler Master GM27-FFS 27" IPS 165Hz Gsync`,
    brand: {
        name: 'Cooler Master',
    },
    price: 4000,
    specification:
        '{ "spec1": {"screen_size":"27","resolution":"1920x1080","sync":"Gsync"}, "spec2": {"refresh_rate":"165Hz","response_time":"1ms"}, "spec3": {"panel_type":"IPS","sync":"Gsync"}, "spec4": {"ports":"HDMI,DP","stand":"Yes"}, "spec5": {"warranty":"3years"}}',
    item_img: [
        {
            img: product_img,
            isPrimrary: true,
        },
        {
            img: product_img2,
            isPrimrary: false,
        },
        {
            img: product_img3,
            isPrimrary: false,
        },
        {
            img: product_img,
            isPrimrary: false,
        },
        {
            img: product_img,
            isPrimrary: false,
        },
        {
            img: product_img,
            isPrimrary: false,
        },
        {
            img: product_img,
            isPrimrary: false,
        },
    ],
    description: `
    # h1 Heading 8-)
    ## h2 Heading
    ### h3 Heading
    #### h4 Heading
    `,
}
