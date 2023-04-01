// This is spoofed data, later to be loaded into the DB
import _12ozCokeCan from './assets/12ozcokecan.jpeg'
import _12ozAWRootbeerCan from './assets/12oza&wrootbeercan.jpeg'
import _12ozDrPepperCan from './assets/12ozdrpeppercan.jpeg'
import _12ozSpriteCan from './assets/12ozspritecan.jpg'
import _12ozFantaCan from './assets/12ozfantacan.webp'
import _12ozBigRedCan from './assets/12ozbigredcan.jpg'
import _12ozMountainDewCan from './assets/12ozmountaindewcan.jpeg'
import _12ozCrushGrapeCan from './assets/12ozcrushgrapecan.webp'
import _20ozPepsiBottle from './assets/20ozpepsibottle.webp'
import _12ozSierraMistCan from './assets/12ozsierramistcan.jpeg'





export const PRODUCTS = [
    {
        id: 1,
        productName: '12oz Coca-cola',
        price: 1.15,
        productImage: _12ozCokeCan,
        weightAmount: 12,
        weightType: 'oz',
        descript: 'A carbonated soft drink flavored with vanilla, cinnamon, citrus oils and other flavorings.',
        star1Rate: 0,
        star2Rate: 0,
        star3Rate: 0,
        star4Rate: 0,
        star5Rate: 0,
        tags: ["#vintage", "#cola", "#good", "#soda"]
    },
    {
        id: 2,
        productName: '12oz A&W Rootbeer',
        price: 1.35,
        productImage: _12ozAWRootbeerCan,
        weightAmount: 12,
        weightType: 'oz',
        descript: 'Caffeine free, and its made with aged vanilla for a sweet and smooth taste that has become the standard in root beer soft drinks. ',
        star1Rate: 0,
        star2Rate: 0,
        star3Rate: 0,
        star4Rate: 0,
        star5Rate: 0,
        tags: ['#rootbeer', '#soda', '#americanmade', '#authentic']
    },
    {
        id: 3,
        productName: '12oz Dr.Pepper',
        price: 0.95,
        productImage: _12ozDrPepperCan,
        descript: 'A refreshing soda with a sweet and savory flavor, with subtle notes of cherry and caramel.',
        star1Rate: 0,
        star2Rate: 0,
        star3Rate: 0,
        star4Rate: 0,
        star5Rate: 0,
        tags: ['#drpepper', '#soda', '#sweets', '#mrsfreshley']
    },
    {
        id: 4,
        productName: '12oz Sprite',
        price: 1.95,
        productImage: _12ozSpriteCan,
        weightAmount: 12,
        weightType: 'oz',
        descript: 'Crisp, refreshing, clean-tasiting, lemon-lime flavored soda.',
        star1Rate: 0,
        star2Rate: 0,
        star3Rate: 0,
        star4Rate: 0,
        star5Rate: 0,
        tags: ['#sprite', '#pixel', '#spriteart', '#drinks']
    },

    {
        id: 5,
        productName: '12oz Fanta',
        price: 3.50,
        productImage: _12ozFantaCan,
        weightAmount: 12,
        weightType: 'oz',
        descript: 'A soft drink with a tingly, fruity taste, made with 2 percent juice and contains no artificial colours or flavours',
        star1Rate: 0,
        star2Rate: 0,
        star3Rate: 0,
        star4Rate: 0,
        star5Rate: 0,
        tags: ['#fanta', '#raresoda', '#love', '#pop']
    },

    {
        id: 6,
        productName: '12oz Big Red',
        price: 1.50,
        productImage: _12ozBigRedCan,
        weightAmount: 12,
        weightType: 'oz',
        descript: 'A soda known for its Red color, and unique flavor which is a mix of emon and orange oils, topped off by a pure vanilla that offers a creamy aftertaste.',
        star1Rate: 0,
        star2Rate: 0,
        star3Rate: 0,
        star4Rate: 0,
        star5Rate: 0,
        tags: ['#bigred', '#red', '#hsmtmts', '#redbytheshed']
    },

    {
        id: 7,
        productName: '12oz Mountain Dew',
        price: 2.75,
        productImage: _12ozMountainDewCan,
        weightAmount: 12,
        weightType: 'oz',
        descript: 'A citrus flavored soda, unique due to the fact that it includes a small amount of orange juice.',
        star1Rate: 0,
        star2Rate: 0,
        star3Rate: 0,
        star4Rate: 0,
        star5Rate: 0,
        tags: ['#mountaindew', '#mountains', '#mountainlove', '#refreshing']
    },

    {
        id: 8,
        productName: '12oz Crush Grape',
        price: 1.32,
        productImage: _12ozCrushGrapeCan,
        weightAmount: 12,
        weightType: 'oz',
        descript: 'A refreashing carbonated beverage full of fresh grape flavor that finishes strongon your tongue.',
        star1Rate: 0,
        star2Rate: 0,
        star3Rate: 0,
        star4Rate: 0,
        star5Rate: 0,
        tags: ['#crushgrape', '#crush', '#purple', '#grape']
    },
    {
        id: 9,
        productName: '20oz Pepsi',
        price: 2.43,
        productImage: _20ozPepsiBottle,
        weightAmount: 20,
        weightType: 'oz',
        descript: 'Pepsi is slightly sweeter, has less carbonation and has a slight hint of grapefruit-lemon-cinnamon flavor.',
        star1Rate: 0,
        star2Rate: 0,
        star3Rate: 0,
        star4Rate: 0,
        star5Rate: 0,
        tags: ['#pepsi', '#pepsicola', '#vintage', '#drinks']
    },
    {
        id: 10,
        productName: '12oz Sierra Mist',
        price: 2.43,
        productImage: _12ozSierraMistCan,
        weightAmount: 20,
        weightType: 'oz',
        descript: 'Crisp, refreshing, clean-tasiting, lemon-lime flavored soda.',
        star1Rate: 0,
        star2Rate: 0,
        star3Rate: 0,
        star4Rate: 0,
        star5Rate: 0,
        tags: ['#sierramist', '#nature', '#refresshing', '#lemonlime']
    }
]