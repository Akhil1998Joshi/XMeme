package com.proj.app.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "memes")
public class Meme {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "meme_id")
	private long meme_id;
	
	@Column(name = "name")
	private String name;
	
	@Lob
	@Type(type = "org.hibernate.type.TextType")
	@Column(name="caption", length=200)
	private String caption;
	
	@Column(name = "url")
	private String url;
	
	@CreationTimestamp
    private LocalDateTime createDateTime;
    
	@UpdateTimestamp
    private LocalDateTime updateDateTime;
    
    

	public Meme() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

	public Meme(long meme_id, String name, String caption, String url, LocalDateTime createDateTime,
			LocalDateTime updateDateTime) {
		super();
		this.meme_id = meme_id;
		this.name = name;
		this.caption = caption;
		this.url = url;
		this.createDateTime = createDateTime;
		this.updateDateTime = updateDateTime;
	}



	public long getMeme_id() {
		return meme_id;
	}

	public void setMeme_id(long meme_id) {
		this.meme_id = meme_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCaption() {
		return caption;
	}

	public void setCaption(String caption) {
		this.caption = caption;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public LocalDateTime getCreateDateTime() {
		return createDateTime;
	}

	public void setCreateDateTime(LocalDateTime createDateTime) {
		this.createDateTime = createDateTime;
	}

	public LocalDateTime getUpdateDateTime() {
		return updateDateTime;
	}

	public void setUpdateDateTime(LocalDateTime updateDateTime) {
		this.updateDateTime = updateDateTime;
	}



	@Override
	public String toString() {
		return "Meme [meme_id=" + meme_id + ", name=" + name + ", caption=" + caption + ", url=" + url
				+ ", createDateTime=" + createDateTime + ", updateDateTime=" + updateDateTime + "]";
	}
	
	
  
}
