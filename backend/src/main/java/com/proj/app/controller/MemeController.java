package com.proj.app.controller;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.proj.app.exception.APIException;
import com.proj.app.exception.ResourceNotFoundException;
import com.proj.app.model.Meme;
import com.proj.app.repository.MemeRepository;

@CrossOrigin
@RestController
public class MemeController {
	
	@Autowired
	private MemeRepository memeRepository;
	
	
	@GetMapping("/memes")
	public ResponseEntity<List<Meme>> getAllMemesWithLimit(){
		 
		List<Meme> memes = memeRepository.findAllTheMemesWithLimit();
		
		return ResponseEntity.ok(memes);
	}
	
	@PostMapping("/memes")
	public Meme createMeme(@RequestBody Meme meme ) {
		
		//Check the duplicate post with same data
		boolean memeCheck = memeRepository.existsMemeLikeQuery(meme.getName(),meme.getCaption(),meme.getUrl());
		
		if(memeCheck == true) {
			throw new APIException("Please Be Creative, Don't Post Duplicate Meme Again!");
		}
		else {
			return memeRepository.save(meme);
		}
		
		
	}
	
	@GetMapping("/memes/{id}")
    public ResponseEntity<Meme> getMemeById(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
		 
          Meme meme = memeRepository.findById(id)
        		  .orElseThrow(() -> new ResourceNotFoundException("Meme Does Not Exist For This Id :: " + id));
         
          return ResponseEntity.ok(meme);
    }
	
	@PatchMapping("/memes/{id}")
	public ResponseEntity<Meme> updateMeme(@PathVariable("id") Long id, @RequestBody Meme memeDetails) throws ResourceNotFoundException{
		 
		Optional<Meme> memeOptional = Optional.of(memeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Meme does not exist for this id :: " + id)));
		
		Meme meme = memeOptional.get();
		
		
		if (!Objects.isNull(memeDetails.getCaption())) meme.setCaption(memeDetails.getCaption());
		if (!Objects.isNull(memeDetails.getUrl())) meme.setUrl(memeDetails.getUrl());
	    
	    Meme updatedMeme = memeRepository.save(meme);
			
	    return ResponseEntity.ok(updatedMeme);
	}


         
         
}
