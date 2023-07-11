import React from 'react';
import { render } from '@testing-library/react';
import SessionCard from './SessionCard';
import { Elevation } from '@blueprintjs/core';

describe('SessionCard', () => {
  const cardClassName = 'session-card';
  describe('interactive', () => {
    const interactiveClassName = 'bp5-interactive';
    it('true時にマウスオーバーで高度が変わる', () => {
      const { container } = render(
        <SessionCard interactive={true}>Test</SessionCard>
      );
      const elements = container.getElementsByClassName(interactiveClassName);
      expect(elements).toHaveLength(1);
    });
    it('false時にマウスオーバーで高度が変わる', () => {
      const { container } = render(
        <SessionCard interactive={false}>Test</SessionCard>
      );
      const elements = container.getElementsByClassName(interactiveClassName);
      expect(elements).toHaveLength(0);
    });
    it('未指定でマウスオーバーで高度が変わる', () => {
      const { container } = render(<SessionCard>Test</SessionCard>);
      const elements = container.getElementsByClassName(interactiveClassName);
      expect(elements).toHaveLength(0);
    });
  });
  describe('elevation', () => {
    it('0 (Elevation.ZERO) のときに高さ0である', () => {
      const { container } = render(
        <SessionCard elevation={Elevation.ZERO}>Test</SessionCard>
      );
      const card = container.getElementsByClassName(cardClassName)[0];
      expect(card.className.match('bp5-elevation-0')).toBeTruthy();
    });
    it('1 (Elevation.ONE) のときに高さ1である', () => {
      const { container } = render(
        <SessionCard elevation={Elevation.ONE}>Test</SessionCard>
      );
      const card = container.getElementsByClassName(cardClassName)[0];
      expect(card.className.match('bp5-elevation-1')).toBeTruthy();
    });
    it('2 (Elevation.TWO) のときに高さ2である', () => {
      const { container } = render(
        <SessionCard elevation={Elevation.TWO}>Test</SessionCard>
      );
      const card = container.getElementsByClassName(cardClassName)[0];
      expect(card.className.match('bp5-elevation-2')).toBeTruthy();
    });
    it('3 (Elevation.THREE) のときに高さ3である', () => {
      const { container } = render(
        <SessionCard elevation={Elevation.THREE}>Test</SessionCard>
      );
      const card = container.getElementsByClassName(cardClassName)[0];
      expect(card.className.match('bp5-elevation-3')).toBeTruthy();
    });
    it('4 (Elevation.FOUR) のときに高さ4である', () => {
      const { container } = render(
        <SessionCard elevation={Elevation.FOUR}>Test</SessionCard>
      );
      const card = container.getElementsByClassName(cardClassName)[0];
      expect(card.className.match('bp5-elevation-4')).toBeTruthy();
    });
    it('未指定時に高さ2である', () => {
      const { container } = render(<SessionCard>Test</SessionCard>);
      const card = container.getElementsByClassName(cardClassName)[0];
      expect(card.className.match('bp5-elevation-2')).toBeTruthy();
    });
  });
});
