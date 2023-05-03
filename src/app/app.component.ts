import { Component, Inject, Injector, OnInit } from '@angular/core';
import { Course } from './model/course';
import { AppConfig, CONFIG_TOKEN } from './config';
import { COURSES } from '../db-data';
import { CoursesService } from './courses/courses.service';
import { createCustomElement } from '@angular/elements';
import { CourseTitleComponent } from './course-title/course-title.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  courses: Course[] = COURSES;
  coursesTotal = this.courses.length;

  constructor(
      private coursesService: CoursesService,
      @Inject(CONFIG_TOKEN) private config: AppConfig,
      private injector: Injector) {
  }

  ngOnInit() {
      const htmlElement = createCustomElement(CourseTitleComponent, {injector:this.injector});
      customElements.define('course-title', htmlElement);
  }

  onCourseSelected(course: Course) {
    console.log('event bubbled up to app component... ', course);
  }

  onEditCourse() {
    // this.courses[1].category = 'ADVANCED'; //why is this here?
    console.log('clicked edit course');
  }

  save(course: Course) {
      this.coursesService.saveCourse(course)
        .subscribe(
          () => console.log('Course Saved!')
        );
  }
}
