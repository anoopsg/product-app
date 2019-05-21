import { connect } from 'react-redux';
import ProductFrom from '../components/ProductForm';
import { productSchema } from '../utils/dataProvider';
import { productCreate, productUpdate } from '../actions/index';
import { v4 } from 'uuid';

const mapStateToProps = (state, ownProps) => {
    const { params } = ownProps.match;
    let product = productSchema;

    if (params.hasOwnProperty('productId')) {
        let tmp = state.products.find(product => product.id.toString() === params.productId)
        if (tmp instanceof Object) {
            product = tmp;
        }
    }
    return {
        product
    }
};

const mapDispatchToProps = (dispatch) => ({
    onProductSave: product => {
        if (product.id) {
            dispatch(productUpdate(product));
        } else {
            product.id = v4();
            dispatch(productCreate(product));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductFrom);