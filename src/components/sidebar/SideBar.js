import React, {Component} from 'react';
import {MdKeyboardArrowDown} from 'react-icons/md'
import {MdMenu} from 'react-icons/md'
import {MdSearch} from 'react-icons/md'
import {MdEject} from 'react-icons/md'
import SideBarOption from './SideBarOption'
import {get, last} from 'lodash'
import { createChatNameFromUsers } from '../../Factories'

export default class SideBar extends Component{
	constructor(props){
		super(props)

		this.state = {
			reciever: ""
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const {reciever} = this.state
		console.log(reciever)
		const {onSendPrivateMessage} = this.props

		onSendPrivateMessage(reciever)
		this.setState({reciever: ""})


	}

    render() {
		const {chats, activeChat, user, setActiveChat, logout, users} = this.props
		const {reciever} = this.state
        return (
            <div id="side-bar">
                <div className="heading">
                    <div className="app-name">Our Cool Chat<MdKeyboardArrowDown/></div>
                    <div className="menu"><MdMenu /></div>
                </div>
                <form onSubmit={this.handleSubmit} className="search">
                    <i className="search-icon"><MdSearch /></i>
					<input placeholder="Search" type="text"
						value={reciever}
						onChange={(e)=>{this.setState({reciever:e.target.value})}}/>
                    <div className="plus"></div>
                </form>
                <div 
						className="users" 
						ref='users' 
						onClick={(e)=>{ (e.target === this.refs.user) && setActiveChat(null) }}>
						
						{
						chats.map((chat)=>{
							if(chat.name){
								return(
									<SideBarOption
										key = {chat.id}
										name= {chat.isCommunity ? chat.name : createChatNameFromUsers(chat.users, user.name)}
										lastMessage = { get(last(chat.messages), 'message', '')}
										onClick = { () => {this.props.setActiveChat(chat)}}
										active = {activeChat!=null ? activeChat.id === chat.id : false }
									/>
								)
							}

							return null
						})	
						}
						
					</div>
                <div className="current-user">
                    <span>{user.name}</span>
                    <div onClick={()=>{logout()}} title="Logout" className="logout">
                        <MdEject />
                    </div>
                </div>
            </div>
        )
    }
}