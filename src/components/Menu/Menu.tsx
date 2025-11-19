import React, { useState } from "react"
import { Presentation } from '../../core/types/type';
import styles from './Menu.module.css';

interface MenuProps {
    minimalPresentation: Presentation;
    maximalPresentation: Presentation;
    onPresentationMenu: () => void;
    onSlideSettingsMenu: () => void;
    onAddElementsMenu: () => void;
    onEditElementsMenu: () => void;
    onChangeTitle: (title: string) => void;
}

enum OriginMenu {
    MenuPresentationSettingsButton = "Presentation Settings",
    MenuSlideSettingsButton = "Slide Settings",
    MenuAddElementsButton = "Add Elements",
    MenuEditElementsButton = "EditElements"
};

export const Menu: React.FC<MenuProps> = ({
    maximalPresentation,
    minimalPresentation,
    onAddElementsMenu,
    onEditElementsMenu,
    onPresentationMenu,
    onSlideSettingsMenu,
    onChangeTitle
}) => {
    {
        const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChangeTitle(e.target.value);
        };


        const getButtonClass = (isActive: boolean) => {
            return isActive ? styles.active : '';
        };


        return (
            <div>
                <div className={styles.toolbarGroup}>
                    <h3 className={styles.groupTitle}>Презентация</h3>
                    <input
                        type="text"
                        placeholder="Название презентации"
                        onChange={handleTitleChange}
                        className={styles.titleInput}
                    />
                </div>
            </div>
        );
    }
}