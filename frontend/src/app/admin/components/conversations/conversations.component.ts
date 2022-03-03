import { Component, ElementRef, HostListener, KeyValueDiffer, KeyValueDiffers, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ChatService } from 'src/app/mybot/services/chat.service';
import { MsgService } from 'src/app/mybot/services/msg.service';
import { StoreService } from 'src/app/mybot/services/store.service';
import { HelperService, UserService } from 'src/app/shared/services';
import { BotService } from '../../services/bot.service';
import { BotEntity, ChatMessageEntity, ChatUserEntity, ChatUserType } from 'src/app/shared/entities';
import { SocketData } from 'src/app/mybot/enums';
import * as _ from 'lodash';
import { ChatAgentService } from '../../services/chat-agent.service';
@Component({
	selector: 'app-conversations',
	templateUrl: './conversations.component.html'
})
export class ConversationsComponent implements OnInit {

	isChatSidebarOpen = true;
	textMsg = "";
	private filterDiffer: KeyValueDiffer<string, any>;
	@ViewChild('textMsgBox') textMsgBox: ElementRef<HTMLInputElement> = {} as ElementRef;
	@ViewChild('scrollMe') private myScrollContainer: ElementRef = {} as ElementRef;
	@ViewChildren('messages') messages: QueryList<any> = {} as QueryList<any>;
	constructor(
		public help: HelperService,
		public userService: UserService,
		public store: StoreService,
		public chatService: ChatService,
		public chatAgentService: ChatAgentService,
		public msgService: MsgService,
		private botService: BotService,
		private differs: KeyValueDiffers
	) {
		this.filterDiffer = this.differs.find(this.store.selectedUser?.lastMessage || {}).create();
	}

	ngOnInit(): void {
		this.getBots();
	}

	ngDoCheck(): void {
		//used to detect filter object value changes and trigger emitChange()
		const changes = this.filterDiffer.diff(this.store.selectedUser?.lastMessage || {});
		if (changes) {
			this.scrollToBottom();
		}
}

	ngAfterViewInit() {
		this.scrollToBottom();
		// this.messages.changes.subscribe(this.scrollToBottom);
	}

	getBots() {
		this.botService.getBots().subscribe((res: any) => {
			this.store.bots = res
			if (this.store.bots.length > 0) {
				const { userId, email, phone, name, owner } = this.userService.currentUserValue;
				this.store.botUser = { id: userId, email, phone, name, type: ChatUserType.AGENT, owner }
				this.chatAgentService.init()
			}
		}, (error: any) => {
			// this.helperService.notify('error', error);
		});
	}

	get msgs() {
		return this.msgService.msgs;
	}



	previousKey = "";
	onChangeHTML(event: any) {
		let textMsg = this.textMsgBox.nativeElement.textContent || "";
		if (!textMsg) {
			this.textMsgBox.nativeElement.textContent = "";
			return;
		}

		this.textMsg = this.textMsgBox.nativeElement.innerHTML || "";
		this.textMsg = this.textMsg.replace(/<[\/]?div>/gi, "");
		this.textMsg = this.textMsg.replace(/<br\s*[\/]?>/gi, "\n");
		this.textMsg = this.textMsg.trim();

		if (event.key == "Enter" && this.previousKey != "Shift") {
			this.onSubmit();
		} else {
			this.previousKey = event.key;
		}

	}

	onSubmit() {
		this.textMsg = this.htmlToText(this.textMsg);
		console.log(this.textMsg);
		this.textMsgBox.nativeElement.innerHTML = "";
		this.msgService.onAgentReply(this.textMsg);
	}

	onUserSelect(botUserId: string) {
		let user = this.store.onlineUsers.find(item => item.id == botUserId);
		if (user) {
			this.store.selectedUser = user;
			this.getPreviousMessages();
			this.isChatSidebarOpen = !this.isChatSidebarOpen
		}
	}

	isloading = false
	getPreviousMessages() {
		console.log("selectedUser", this.store.selectedUser)
		if (this.store.selectedUser && !this.isloading) {
			this.isloading = true;
			this.store.selectedUser.chatMessages = this.store?.selectedUser?.chatMessages || [];
			let firstMessage = (this.store.selectedUser?.chatMessages || [])[0] || this.store.selectedUser?.lastMessage;
			let offset = firstMessage.id ? firstMessage.id : ""
			let selectedUser = this.store.selectedUser;
			let room = "user" + this.store.selectedUser?.id;
			this.chatService.getPreviousMessages(room, offset).subscribe((chatMessages: any) => {
				this.isloading = false
				console.log(chatMessages.length);

				if (this.store.selectedUser)
					this.store.selectedUser.chatMessages = chatMessages.reverse().concat(selectedUser.chatMessages)
				// this.store.selectedUser.chatMessages = chatMessages.concat(selectedUser.chatMessages)
				// }, (error: any) => {
				//   console.log(error);
			});
		}
	}

	htmlToText(html: string) {
		const tmp = document.createElement('DIV');
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || '';
	}

	// Console for ng-dropdown ends
	@HostListener('scroll', ['$event'])
	handleScrollUpChats(event: any) {
		if (event.target.scrollTop < 10) {
			setTimeout(() => {
				this.getPreviousMessages()
			}, 500)
			console.log("scroll end");
		}
	}

	scrollToBottom = () => {
		try {
			setTimeout(() => {
				this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
			}, 500)
		} catch (err) { }
	}
}
