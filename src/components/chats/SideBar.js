import React, {Component} from 'react';
import {MdKeyboardArrowDown} from 'react-icons/md'
import {MdMenu} from 'react-icons/md'
import {MdSearch} from 'react-icons/md'
import {MdEject} from 'react-icons/md'

export default class SideBar extends Component{
    render() {
        const {chats, activeChat, user, setActiveChat, logout} = this.props
        return (
            <div id="side-bar">
                <div className="heading">
                    <div className="app-name">Our Cool Chat<MdKeyboardArrowDown/></div>
                    <div className="menu"><MdMenu /></div>
                </div>
                <div className="search">
                    <i className="search-icon"><MdSearch /></i>
                    <input placeholder="Search" type="text"/>
                    <div className="plus"></div>
                </div>
            </div>
        )
    }
}