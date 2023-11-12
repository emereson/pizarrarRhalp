import debounce from 'lodash.debounce';
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { TOOLS, Sizes } from '../../enums/whiteBoard.enum';
import { useUserClassRoom } from '../UserManagment/hooks/useUserClassRoom';

export const whiteBoardContext = React.createContext(null);

const WhiteBoardProvider = ({ children }) => {
  const [selectedTool, setSelectedTool] = useState(TOOLS.PENCIL);
  const [lastSelectedTool, setLastSelectedTool] = useState(null);
  const [color, setColor] = useState('Black');
  const [size, setSize] = useState(Sizes.SIZE_3);
  const [colorPaletteOpen, setColorPaletteOpen] = useState(false);
  const [sizeBarOpen, setSizeBarOpen] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [socketId, setSocketId] = useState();
  const [opacity, setOpacity] = useState(1);
  const [openchat, setOpenChat] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { isDisabledAndStudent } = useUserClassRoom();
  const [isVoiceOrVideo, setIsVoiceOrVideo] = useState(true);
  const [isFilledCircle, setFilledCircle] = useState(false);
  const [isFilledSquare, setFilledSquare] = useState(false);
  const maxChatCountDownNumber = 20;
  const [chatCountDown, setChatCountDown] = useState(0);
  const [isZoomIn, SetIsZoomIn] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  /** these tools will get a selected state when clicked */
  const selectableTools = [
    TOOLS.PENCIL,
    TOOLS.ERASER,
    TOOLS.TEXT,
    TOOLS.POINTER,
    TOOLS.SQUARE,
    TOOLS.SEGMENT,
    TOOLS.ARROW,
    TOOLS.CIRCLE,
    TOOLS.BUCKET,
    TOOLS.CURVED_ARROW,
    TOOLS.ZOOMIN,
    TOOLS.ZOOMOUT,
    TOOLS.HAND
  ];

  const reduceFunction = useCallback(() => {
    setChatCountDown(chatCountDown - 1);
  }, [chatCountDown]);

  const reduceChatCountDown = debounce(count => {
    reduceFunction();
  }, 1000);

  const reloadChatCountDown = debounce(() => {
    let id = window.setTimeout(function () {}, 0);
    while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
    setTimeout(() => {
      setChatCountDown(maxChatCountDownNumber);
      setOpenChat(true);
    }, 500);
  }, 1000);

  useEffect(() => {
    if (chatCountDown > 0) {
      setOpenChat(true);
      setTimeout(() => {
        reduceChatCountDown();
      }, 1000);
    } else if (chatCountDown === 0) {
      setOpenChat(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatCountDown]);

  const toggleColorPalette = () => {
    setColorPaletteOpen(!colorPaletteOpen);
    setSizeBarOpen(false);
  };

  const toggleSizeBar = () => {
    setSizeBarOpen(!sizeBarOpen);
    setColorPaletteOpen(false);
  };

  const handleZoom = () => {
    SetIsZoomIn(!isZoomIn);
    if (isZoomIn) {
      setZoomLevel(zoomLevel + 0.1);
    } else {
      setZoomLevel(zoomLevel - 0.1);
    }
  };

  const contextData = {
    color,
    colorPaletteOpen,
    isAdmin,
    isDrawing,
    isFilledCircle,
    isFilledSquare,
    isVoiceOrVideo,
    opacity,
    openchat,
    selectableTools,
    selectedTool,
    size,
    sizeBarOpen,
    socketId,

    // method
    setSocketId,
    setOpacity,
    toggleColorPalette,
    toggleSizeBar,
    setSize,
    onChangeTool,
    setColor,
    setColorPaletteOpen,
    setFilledCircle,
    setFilledSquare,
    setIsAdmin,
    setIsDrawing,
    setOpenChat,
    chatCountDown,
    reloadChatCountDown,
    setIsVoiceOrVideo,
    isFilledCircle,
    setFilledCircle,
    isFilledSquare,
    setFilledSquare,
    isZoomIn,
    SetIsZoomIn,
    handleZoom,
    zoomLevel
  };

  function onChangeTool(toolType) {
    if (selectableTools.includes(toolType) && !isDisabledAndStudent) {
      setSelectedTool(toolType);
    }
  }

  useEffect(() => {
    if (isDisabledAndStudent) {
      setLastSelectedTool(selectedTool);
      setSelectedTool(null);
    }
    if (!isDisabledAndStudent && lastSelectedTool) {
      setSelectedTool(lastSelectedTool);
    }
  }, [isDisabledAndStudent]);

  return (
    <whiteBoardContext.Provider value={contextData}>
      {children}
    </whiteBoardContext.Provider>
  );
};

export const useWhiteBoard = () => {
  const context = useContext(whiteBoardContext);
  if (context === undefined) {
    throw new Error('useWhiteBoard can only be used inside WhiteBoardProvider');
  }
  return context;
};

export default WhiteBoardProvider;
