import React, { FC, CSSProperties } from "react";
import { Spin } from "antd";

export interface SpinnerProps {
  style?: CSSProperties;
}

export const Spinner: FC<SpinnerProps> = props => (
  <div className="spinner" style={props.style || {}}><Spin /></div>
)