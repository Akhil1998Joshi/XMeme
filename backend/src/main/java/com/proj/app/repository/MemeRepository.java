package com.proj.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.proj.app.model.Meme;

public interface MemeRepository extends JpaRepository<Meme,Long>{
    
	//Query to get only 100 post and sort according to create date
	@Query(value = "SELECT * FROM memes order by create_date_time desc limit 100", nativeQuery = true)
	public List<Meme> findAllTheMemesWithLimit();
	
	//Query to check the the duplicate post with same data
	@Query("select case when count(c)> 0 then true else false end from Meme c where lower(c.name) like lower(:name) and lower(c.caption) like lower(:caption) and lower(c.url) like lower(:url)")
	boolean existsMemeLikeQuery(@Param("name") String name, @Param("caption") String caption, @Param("url") String url);
}
