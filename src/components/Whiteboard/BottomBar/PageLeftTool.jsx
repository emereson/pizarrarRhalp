import React from 'react';
import { ICONS_COLORS } from '../../../enums/constants.enum';
import { connect } from 'react-redux';
import {
  fetchPageData,
  requestUpdatePage
} from '../../../store/actions/WhiteBoardActions';
import { bindActionCreators } from 'redux';
import { ReactComponent as LeftIconBlack } from 'assets/whiteboard/black/left-black.svg';
import { ReactComponent as LeftIconGrey } from 'assets/whiteboard/grey/left-grey.svg';
import { ReactComponent as LeftIconWhite } from 'assets/whiteboard/white/left-white.svg';

const PageLeft = ({ color, ...props }) => {
  //go to page en canvas
  const goToPage = payload => {
    props.requestUpdatePage(payload);
  };

  return (
    <div onClick={() => goToPage({ page: Math.max(props.page - 1, 1) })}>
      {color === ICONS_COLORS.BLACK && (
        <LeftIconBlack className="page-flecha-icon-item" />
      )}
      {color === ICONS_COLORS.WHITE && (
        <LeftIconWhite className="page-flecha-icon-item" />
      )}
      {color === ICONS_COLORS.GREY && <LeftIconGrey className="page-flecha-icon-item" />}
    </div>
  );
};

const mapStateToProps = state => ({
  page: state.whiteBoard.page
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchPageData, requestUpdatePage }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageLeft);
