import React from 'react';
import { ICONS_COLORS } from '../../../enums/constants.enum';
import { connect } from 'react-redux';
import {
  fetchPageData,
  requestUpdatePage
} from '../../../store/actions/WhiteBoardActions';
import { bindActionCreators } from 'redux';
import { ReactComponent as RightIconBlack } from 'assets/whiteboard/black/right-black.svg';
import { ReactComponent as RightIconGrey } from 'assets/whiteboard/grey/right-grey.svg';
import { ReactComponent as RightIconWhite } from 'assets/whiteboard/white/right-white.svg';

const PageRight = ({ color, ...props }) => {
  //go to page en canvas
  const goToPage = payload => {
    props.requestUpdatePage(payload);
  };

  return (
    <div
      onClick={() => {
        goToPage({ page: props.page + 1 });
      }}
    >
      {color === ICONS_COLORS.BLACK && (
        <RightIconBlack className="page-flecha-icon-item" />
      )}
      {color === ICONS_COLORS.WHITE && (
        <RightIconWhite className="page-flecha-icon-item" />
      )}
      {color === ICONS_COLORS.GREY && <RightIconGrey className="page-flecha-icon-item" />}
    </div>
  );
};

const mapStateToProps = state => ({
  page: state.whiteBoard.page
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchPageData, requestUpdatePage }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageRight);
